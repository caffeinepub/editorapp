import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type DeviceId = string;
export type JobId = bigint;
export interface Job {
    id: JobId;
    status: JobStatus;
    completedAt?: Time;
    startedAt?: Time;
    jobType: string;
    submittedAt: Time;
    results: string;
    error?: string;
    deviceId?: DeviceId;
    priority: bigint;
    qualityPreset: string;
    payload: string;
}
export type Time = bigint;
export interface CachedResult {
    timestamp: Time;
    resultData: string;
}
export enum JobStatus {
    cancelled = "cancelled",
    completed = "completed",
    queued = "queued",
    processing = "processing",
    failed = "failed"
}
export interface backendInterface {
    activateFallback(_jobId: JobId): Promise<void>;
    getCachedResult(jobHash: string): Promise<CachedResult | null>;
    getJobResults(jobId: JobId): Promise<string | null>;
    getJobStatus(jobId: JobId): Promise<JobStatus | null>;
    getOptimalQuality(_deviceId: DeviceId): Promise<string>;
    getQueuedJobs(): Promise<Array<Job>>;
    predictLagRisk(): Promise<bigint>;
    registerDevice(_deviceId: DeviceId, _cpuCores: bigint, _gpuCores: bigint, _ramGB: bigint, _connectionSpeed: bigint): Promise<void>;
    submitJob(jobType: string, payload: string, deviceId: DeviceId | null, qualityPreset: string): Promise<JobId>;
}
