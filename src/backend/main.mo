import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import VarArray "mo:core/VarArray";
import Migration "migration";
import Runtime "mo:core/Runtime";

(with migration = Migration.run)
actor {
  type JobId = Nat;
  type DeviceId = Text;

  type JobStatus = {
    #queued;
    #processing;
    #completed;
    #failed;
    #cancelled;
  };

  type DeviceProfile = {
    deviceId : DeviceId;
    cpuCores : Nat;
    gpuCores : Nat;
    ramGB : Nat;
    connectionSpeed : Nat;
  };

  type CachedResult = {
    resultData : Text;
    timestamp : Time.Time;
  };

  type Job = {
    id : JobId;
    jobType : Text;
    payload : Text;
    status : JobStatus;
    submittedAt : Time.Time;
    startedAt : ?Time.Time;
    completedAt : ?Time.Time;
    results : Text;
    error : ?Text;
    priority : Nat;
    deviceId : ?DeviceId;
    qualityPreset : Text;
  };

  type ProcessingMetric = {
    jobType : Text;
    processingTime : Time.Time;
    deviceId : DeviceId;
    timestamp : Time.Time;
  };

  type FallbackConfig = {
    retryLimit : Nat;
    alternativeProcessing : Bool;
    useCachedSimilarResult : Bool;
    abortWithNotification : Bool;
  };

  var nextJobId : JobId = 0;
  let dayInNanos = 24 * 60 * 60 * 1_000_000_000;

  let jobQueueMap = Map.empty<JobId, Job>();
  let cacheStore = Map.empty<Text, CachedResult>();
  let deviceProfilesMap = Map.empty<DeviceId, DeviceProfile>();
  let performanceMetricsArray : [ProcessingMetric] = [];
  let fallbackConfigMap = Map.empty<Text, FallbackConfig>();

  func calculateJobPriority(jobType : Text, _deviceId : ?DeviceId, _quality : Text) : Nat {
    let typePriority = switch (jobType) {
      case ("enhance") { 100 };
      case ("upscale") { 100 };
      case ("highlight.detect") { 80 };
      case ("export") { 50 };
      case ("video.generate") { 30 };
      case (_) { 0 };
    };
    typePriority;
  };

  public shared ({ caller }) func submitJob(jobType : Text, payload : Text, deviceId : ?DeviceId, qualityPreset : Text) : async JobId {
    let currentTime = Time.now();
    let jobId = nextJobId;
    nextJobId += 1;

    let priority = calculateJobPriority(jobType, deviceId, qualityPreset);

    let job = {
      id = jobId;
      jobType;
      payload;
      status = #queued;
      submittedAt = currentTime;
      startedAt = null;
      completedAt = null;
      results = "";
      error = null;
      priority;
      deviceId;
      qualityPreset;
    };

    jobQueueMap.add(jobId, job);
    jobId;
  };

  public shared ({ caller }) func getJobStatus(jobId : JobId) : async ?JobStatus {
    switch (jobQueueMap.get(jobId)) {
      case (null) { null };
      case (?job) { ?job.status };
    };
  };

  public shared ({ caller }) func getJobResults(jobId : JobId) : async ?Text {
    switch (jobQueueMap.get(jobId)) {
      case (null) { null };
      case (?job) {
        switch (job.status) {
          case (#completed) { ?job.results };
          case (_) { null };
        };
      };
    };
  };

  public query ({ caller }) func getCachedResult(jobHash : Text) : async ?CachedResult {
    switch (cacheStore.get(jobHash)) {
      case (null) { null };
      case (?cache) {
        if (Time.now() - cache.timestamp > dayInNanos) { return null };
        ?cache;
      };
    };
  };

  public shared ({ caller }) func registerDevice(
    _deviceId : DeviceId,
    _cpuCores : Nat,
    _gpuCores : Nat,
    _ramGB : Nat,
    _connectionSpeed : Nat,
  ) : async () {
    Runtime.trap("This method is not available after upgrading to this version.");
  };

  public query ({ caller }) func getOptimalQuality(_deviceId : DeviceId) : async Text {
    Runtime.trap("This method is not available after upgrading to this version.");
  };

  public shared ({ caller }) func activateFallback(_jobId : JobId) : async () {
    Runtime.trap("This method is not available after upgrading to this version.");
  };

  public query ({ caller }) func predictLagRisk() : async Nat {
    0;
  };

  public query ({ caller }) func getQueuedJobs() : async [Job] {
    jobQueueMap.values().toArray().filter(
      func(j) { j.status == #queued }
    );
  };
};
