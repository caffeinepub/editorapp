import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
  type OldActor = {
    var jobQueueMap : Map.Map<Nat, OldJob>;
    var nextJobId : Nat;
  };

  type OldJob = {
    id : Nat;
    jobType : Text;
    payload : Text;
    status : {
      #queued;
      #processing;
      #completed;
      #failed;
      #cancelled;
    };
    submittedAt : Int;
    startedAt : ?Int;
    completedAt : ?Int;
    results : Text;
    error : ?Text;
    priority : Nat;
    deviceId : ?Text;
    qualityPreset : Text;
  };

  type NewActor = {
    var jobQueueMap : Map.Map<Nat, OldJob>;
    var nextJobId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    { var jobQueueMap = old.jobQueueMap; var nextJobId = old.nextJobId };
  };
};
