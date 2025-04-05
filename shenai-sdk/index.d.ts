export * from "./util/src/index";

export interface ShenaiArguments {
  onRuntimeInitialized: () => void;
}

export const enum InitializationResult {
  OK = 0,
  INVALID_API_KEY,
  CONNECTION_ERROR,
  INTERNAL_ERROR,
}

export const enum OperatingMode {
  POSITIONING = 0,
  MEASURE,
  SYSTEM_OVERLOADED,
}

export const enum PrecisionMode {
  STRICT = 0,
  RELAXED,
}

export const enum Screen {
  INITIALIZATION = 0,
  ONBOARDING,
  MEASUREMENT,
  INSTRUCTIONS,
  RESULTS,
  HEALTH_RISKS,
  HEALTH_RISKS_EDIT,
}

export const enum Metric {
  HEART_RATE = 0,
  HRV_SDNN,
  BREATHING_RATE,
  SYSTOLIC_BP,
  DIASTOLIC_BP,
  CARDIAC_STRESS,
  PNS_ACTIVITY,
  CARDIAC_WORKLOAD,
  AGE,
  BMI,
  BLOOD_PRESSURE,
}

export const enum MeasurementPreset {
  ONE_MINUTE_HR_HRV_BR = 0,
  ONE_MINUTE_BETA_METRICS,
  INFINITE_HR,
  INFINITE_METRICS,
  FOURTY_FIVE_SECONDS_UNVALIDATED,
  THIRTY_SECONDS_UNVALIDATED,
  CUSTOM,
  CLINICAL_TRIAL,
}

export const enum CameraMode {
  OFF = 0,
  FACING_USER,
  FACING_ENVIRONMENT,
  DEVICE_ID,
}

export const enum OnboardingMode {
  HIDDEN = 0,
  SHOW_ONCE,
  SHOW_ALWAYS,
}

export const enum FaceState {
  OK = 0,
  TOO_FAR,
  TOO_CLOSE,
  NOT_CENTERED,
  NOT_VISIBLE,
  UNKNOWN,
}

export const enum MeasurementState {
  NOT_STARTED = 0, // Measurement has not started yet
  WAITING_FOR_FACE, // Waiting for face to be properly positioned in the frame
  RUNNING_SIGNAL_SHORT, // Measurement started: Signal is too short for any conclusions
  RUNNING_SIGNAL_GOOD, // Measurement proceeding: Signal quality is good
  RUNNING_SIGNAL_BAD, // Measurement stalled due to poor signal quality
  RUNNING_SIGNAL_BAD_DEVICE_UNSTABLE, // Measurement stalled due to poor signal quality (because of unstable device)
  FINISHED, // Measurement has finished successfully
  FAILED, // Measurement has failed
}

export interface Heartbeat {
  start_location_sec: number;
  end_location_sec: number;
  duration_ms: number;
}

export interface MeasurementResults {
  heart_rate_bpm: number;
  hrv_sdnn_ms: number | null;
  hrv_lnrmssd_ms: number | null;
  stress_index: number | null;
  parasympathetic_activity: number | null;
  breathing_rate_bpm: number | null;
  systolic_blood_pressure_mmhg: number | null;
  diastolic_blood_pressure_mmhg: number | null;
  cardiac_workload_mmhg_per_sec: number | null;
  age_years: number | null;
  bmi_kg_per_m2: number | null;
  weight_kg: number | null;
  height_cm: number | null;
  heartbeats: Heartbeat[];
  average_signal_quality: number;
}

export interface CustomMeasurementConfig {
  durationSeconds?: number;
  infiniteMeasurement?: boolean;

  instantMetrics?: Metric[];
  summaryMetrics?: Metric[];

  realtimeHrPeriodSeconds?: number;
  realtimeHrvPeriodSeconds?: number;
  realtimeCardiacStressPeriodSeconds?: number;
}

export interface CustomColorTheme {
  themeColor: string;
  textColor: string;
  backgroundColor: string;
  tileColor: string;
}

export interface NormalizedFaceBbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Vector3d {
  x: number;
  y: number;
  z: number;
}

export interface EulerAngles {
  yaw: number;
  pitch: number;
  roll: number;
}

export interface FacePose {
  position: Vector3d;
  rotation: EulerAngles;
}

export interface MomentaryHrValue {
  timestamp_sec: number;
  hr_bpm: number;
}

export const enum Gender {
  MALE = 0,
  FEMALE,
  OTHER,
}

export const enum Race {
  WHITE = 0,
  AFRICAN_AMERICAN,
  OTHER,
}

interface HardAndFatalEventsRisks {
  coronaryDeathEventRisk: number | null;
  fatalStrokeEventRisk: number | null;
  totalCVMortalityRisk: number | null;
  hardCVEventRisk: number | null;
}

interface CVDiseasesRisks {
  overallRisk: number | null;
  coronaryHeartDiseaseRisk: number | null;
  strokeRisk: number | null;
  heartFailureRisk: number | null;
  peripheralVascularDiseaseRisk: number | null;
}

interface RisksFactorsScores {
  ageScore: number | null;
  sbpScore: number | null;
  smokingScore: number | null;
  diabetesScore: number | null;
  bmiScore: number | null;
  cholesterolScore: number | null;
  cholesterolHdlScore: number | null;
  totalScore: number | null;
}

export interface HealthRisks {
  hardAndFatalEvents: HardAndFatalEventsRisks;
  cvDiseases: CVDiseasesRisks;
  vascularAge: number | null;
  scores: RisksFactorsScores;
}

export interface RisksFactors {
  age?: number;
  cholesterol?: number;
  cholesterolHdl?: number;
  sbp?: number;
  isSmoker?: boolean;
  hypertensionTreatment?: boolean;
  hasDiabetes?: boolean;
  bodyHeight?: number; // in centimeters
  bodyWeight?: number; // in kilograms
  gender?: Gender;
  country?: string; // country name ISO code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  race?: Race;
}

export type EventName =
  | "START_BUTTON_CLICKED"
  | "STOP_BUTTON_CLICKED"
  | "MEASUREMENT_FINISHED"
  | "USER_FLOW_FINISHED";

export interface InitializationSettings {
  precisionMode?: PrecisionMode;
  operatingMode?: OperatingMode;
  measurementPreset?: MeasurementPreset;
  cameraMode?: CameraMode;
  onboardingMode?: OnboardingMode;
  showUserInterface?: boolean;
  showFacePositioningOverlay?: boolean;
  showVisualWarnings?: boolean;
  enableCameraSwap?: boolean;
  showFaceMask?: boolean;
  showBloodFlow?: boolean;
  proVersionLock?: boolean;
  hideShenaiLogo?: boolean;
  enableStartAfterSuccess?: boolean;
  enableSummaryScreen?: boolean;
  enableHealthRisks?: boolean;
  showOutOfRangeResultIndicators?: boolean;
  showTrialMetricLabels?: boolean;
  enableFullFrameProcessing?: boolean;
  language?: string;
  customColorTheme?: CustomColorTheme;
  customMeasurementConfig?: CustomMeasurementConfig;
  eventCallback?: (event: EventName) => void;
  onCameraError?: () => void;
}

export interface UIConfig {
  onboardingMode: OnboardingMode;

  showUserInterface: boolean;
  showFacePositioningOverlay: boolean;
  showWarningIcons: boolean;
  enableCameraSwap: boolean;
  showFaceMask: boolean;
  showBloodFlow: boolean;
  hideShenaiLogo: boolean;
  enableStartAfterSuccess: boolean;
  enableSummaryScreen: boolean;
  enableHealthRisks: boolean;
  showOutOfRangeResultIndicators: boolean;
  showTrialMetricLabels: boolean;

  colorTheme: CustomColorTheme;
}

export interface SDKConfig {
  cameraMode: CameraMode;
  initialOperatingMode: OperatingMode;
  precisionMode: PrecisionMode;

  language: string;

  measurementPreset: MeasurementPreset;
  measurementConfig: CustomMeasurementConfig;

  uiConfig: UIConfig;

  enableFullFrameProcessing: boolean;
}

export interface ShenaiSDK {
  InitializationResult: {
    [P in keyof typeof InitializationResult]: InitializationResult;
  };
  OperatingMode: {
    [P in keyof typeof OperatingMode]: OperatingMode;
  };
  PrecisionMode: {
    [P in keyof typeof PrecisionMode]: PrecisionMode;
  };
  Screen: {
    [P in keyof typeof Screen]: Screen;
  };
  Metric: {
    [P in keyof typeof Metric]: Metric;
  };
  MeasurementPreset: {
    [P in keyof typeof MeasurementPreset]: MeasurementPreset;
  };
  CameraMode: {
    [P in keyof typeof CameraMode]: CameraMode;
  };
  OnboardingMode: {
    [P in keyof typeof OnboardingMode]: OnboardingMode;
  };
  FaceState: {
    [P in keyof typeof FaceState]: FaceState;
  };
  MeasurementState: {
    [P in keyof typeof MeasurementState]: MeasurementState;
  };
  Gender: {
    [P in keyof typeof Gender]: Gender;
  };
  Race: {
    [P in keyof typeof Race]: Race;
  };

  getVersion: () => string;

  initialize: (
    api_key: string,
    user_id: string,
    initialization_settings: InitializationSettings,
    onResult: (result: InitializationResult) => void
  ) => void;
  isInitialized: () => boolean;
  deinitialize: () => void;

  attachToCanvas: (canvas: string, exclusive?: boolean) => void;

  // SDK operating mode
  setOperatingMode: (mode: OperatingMode) => void;
  getOperatingMode: () => OperatingMode;

  // SDK precision mode
  setPrecisionMode: (mode: PrecisionMode) => void;
  getPrecisionMode: () => PrecisionMode;

  // SDK measurement preset
  setMeasurementPreset: (preset: MeasurementPreset) => void;
  getMeasurementPreset: () => MeasurementPreset;
  setCustomMeasurementConfig: (config: CustomMeasurementConfig) => void;
  getCustomMeasurementConfig: () => CustomMeasurementConfig;

  // SDK camera mode
  setCameraMode: (mode: CameraMode) => void;
  getCameraMode: () => CameraMode;
  selectCameraByDeviceId: (deviceId: string, facingUser?: boolean) => void;
  setEnableFullFrameProcessing: (enable: boolean) => void;
  getEnableFullFrameProcessing: () => boolean;

  // SDK interface elements
  setShowUserInterface: (show: boolean) => void;
  getShowUserInterface: () => boolean;
  setShowFacePositioningOverlay: (show: boolean) => void;
  getShowFacePositioningOverlay: () => boolean;
  setShowVisualWarnings: (show: boolean) => void;
  getShowVisualWarnings: () => boolean;
  setEnableCameraSwap: (enable: boolean) => void;
  getEnableCameraSwap: () => boolean;
  setShowFaceMask: (show: boolean) => void;
  getShowFaceMask: () => boolean;
  setShowBloodFlow: (show: boolean) => void;
  getShowBloodFlow: () => boolean;
  setEnableStartAfterSuccess: (enable: boolean) => void;
  getEnableStartAfterSuccess: () => boolean;
  setHideShenaiLogo: (hide: boolean) => void;
  getHideShenaiLogo: () => boolean;
  setShowOutOfRangeResultIndicators: (show: boolean) => void;
  getShowOutOfRangeResultIndicators: () => boolean;
  setShowTrialMetricLabels: (show: boolean) => void;
  getShowTrialMetricLabels: () => boolean;
  setEnableSummaryScreen: (enable: boolean) => void;
  getEnableSummaryScreen: () => boolean;
  setEnableHealthRisks: (enable: boolean) => void;
  getEnableHealthRisks: () => boolean;
  setShowSignalTile: (show: boolean) => void;
  getShowSignalTile: () => boolean;
  setShowSignalQualityIndicator: (show: boolean) => void;
  getShowSignalQualityIndicator: () => boolean;

  setOnboardingMode: (mode: OnboardingMode) => void;
  getOnboardingMode: () => OnboardingMode;

  // SDK color theme
  setCustomColorTheme: (theme: CustomColorTheme) => void;
  getCustomColorTheme: () => CustomColorTheme;

  // SDK face positioning
  getFaceState: () => FaceState;
  getNormalizedFaceBbox: () => NormalizedFaceBbox | null;
  getFacePose: () => FacePose | null;

  // SDK measurement state
  getMeasurementState: () => MeasurementState;
  getMeasurementProgressPercentage: () => number;

  // SDK measurement results
  getHeartRate10s: () => number | null;
  getHeartRate4s: () => number | null;
  getRealtimeHeartRate: () => number | null;
  getRealtimeHrvSdnn: () => number | null;
  getRealtimeCardiacStress: () => number | null;
  getRealtimeMetrics: (period_sec: number) => MeasurementResults | null;
  getMeasurementResults: () => MeasurementResults | null;

  // SDK health risks
  getHealthRisksFactors: () => RisksFactors;
  getHealthRisks: () => HealthRisks;
  computeHealthRisks: (factors: RisksFactors) => HealthRisks;
  getMaximalRisks: (factors: RisksFactors) => HealthRisks;
  getMinimalRisks: (factors: RisksFactors) => HealthRisks;
  getReferenceRisks: (factors: RisksFactors) => HealthRisks;

  // SDK signals
  getHeartRateHistory10s: (maxTimeSec?: number) => MomentaryHrValue[];
  getHeartRateHistory4s: (maxTimeSec?: number) => MomentaryHrValue[];
  getRealtimeHeartbeats: (maxTimeSec?: number) => Heartbeat[];
  getFullPpgSignal: () => number[];

  // SDK recording
  setRecordingEnabled: (enabled: boolean) => void;
  getRecordingEnabled: () => boolean;

  // SDK quality control
  getTotalBadSignalSeconds: () => number;
  getCurrentSignalQualityMetric: () => number;

  // SDK visualizations
  getSignalQualityMapPng: () => number[];
  getFaceTexturePng: () => number[];
  getMetaPredictionImagePng: () => number[];

  // Screen management
  setScreen(screen: Screen): void;
  getScreen(): Screen;

  // Languages
  setLanguage: (language: string) => void;
  getLanguage: () => string;

  // Licensing
  getPricingPlan: () => string;

  // Tracing
  getTraceID: () => string;
  getMeasurementID: () => string;

  // SDK configuration
  getSDKConfigString: () => string;
  applySDKConfig(config_json: string): void;
}

export function createPreloadDisplay(canvas_id: string): void;

export default function (args: ShenaiArguments): Promise<ShenaiSDK>;
