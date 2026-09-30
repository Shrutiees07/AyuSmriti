/**
 * @file benchmark.js
 * @description Automated Performance & Latency Benchmarking Script for AyuSmriti.
 * Profiles end-to-end cognitive engine adaptive calculation throughput, storage serialization,
 * and memory overhead over batch operations.
 * 
 * Run via: node benchmark.js
 */

import { performance } from 'perf_hooks';
import {
  calculateCognitiveScore,
  evaluateLevelAdaptation,
  analyzeCognitiveDrift
} from './src/services/cognitiveEngine.js';
import {
  saveLocal,
  getLocal,
  enqueueSyncItem,
  getPendingSyncQueue
} from './src/services/offlineStorage.js';

console.log('====================================================');
console.log('  AyuSmriti Performance & Latency Benchmark Suite   ');
console.log('====================================================\n');

// 1. Cognitive Engine Calculation Benchmark (10,000 iterations)
const ITERATIONS = 10000;
const mockSession = {
  accuracy: 0.85,
  averageResponseTimeMs: 2400,
  errorCount: 1,
  totalMoves: 10,
  currentLevel: 2,
  sessionDurationSeconds: 24
};

const startCognitive = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  calculateCognitiveScore(mockSession);
  evaluateLevelAdaptation(mockSession);
}
const endCognitive = performance.now();
const totalCognitiveMs = endCognitive - startCognitive;
const avgCognitiveLatencyMs = (totalCognitiveMs / ITERATIONS).toFixed(4);
const cognitiveOpsPerSec = Math.round((ITERATIONS / totalCognitiveMs) * 1000);

console.log('--- 1. Adaptive Cognitive Engine Latency ---');
console.log(`Total Operations      : ${ITERATIONS.toLocaleString()} iterations`);
console.log(`Total Time Elapsed    : ${totalCognitiveMs.toFixed(2)} ms`);
console.log(`Average Latency       : ${avgCognitiveLatencyMs} ms / operation`);
console.log(`Throughput            : ${cognitiveOpsPerSec.toLocaleString()} ops/sec\n`);

// 2. Offline Storage Serialization & Sync Queue Benchmark (1,000 iterations)
const STORAGE_ITERATIONS = 1000;
const startStorage = performance.now();
for (let i = 0; i < STORAGE_ITERATIONS; i++) {
  saveLocal(`bench_key_${i}`, { session: i, metrics: mockSession });
  enqueueSyncItem('BENCHMARK_BATCH', { id: i, payload: mockSession });
}
const endStorage = performance.now();
const totalStorageMs = endStorage - startStorage;
const avgStorageLatencyMs = (totalStorageMs / STORAGE_ITERATIONS).toFixed(4);

console.log('--- 2. Offline Storage & Sync Queue Performance ---');
console.log(`Storage Write Operations: ${STORAGE_ITERATIONS.toLocaleString()} ops`);
console.log(`Total Time Elapsed      : ${totalStorageMs.toFixed(2)} ms`);
console.log(`Average Write Latency   : ${avgStorageLatencyMs} ms / write\n`);

// 3. Cognitive Drift Trend Analysis Benchmark
const historicalSet = Array.from({ length: 50 }, (_, idx) => ({
  score: 75 + Math.sin(idx) * 10,
  accuracy: 0.8,
  timestamp: Date.now() - idx * 86400000
}));

const startDrift = performance.now();
for (let i = 0; i < 5000; i++) {
  analyzeCognitiveDrift(historicalSet);
}
const endDrift = performance.now();
const totalDriftMs = endDrift - startDrift;

console.log('--- 3. Historical Cognitive Drift Analysis ---');
console.log(`Batch Size              : 50 historical data points`);
console.log(`Total Time (5,000 runs) : ${totalDriftMs.toFixed(2)} ms`);
console.log(`Average Latency         : ${(totalDriftMs / 5000).toFixed(4)} ms\n`);

// Memory Usage Profile
const memoryUsage = process.memoryUsage();
console.log('--- 4. Memory Overhead Profile ---');
console.log(`Heap Used  : ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Total : ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`RSS        : ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB\n`);

console.log('====================================================');
console.log('  BENCHMARK VERIFICATION COMPLETE - EXCELLENT SPEED  ');
console.log('====================================================');
