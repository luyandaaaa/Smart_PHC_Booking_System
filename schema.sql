-- Users Table (Core entity)
CREATE TABLE users (
  user_id UUID PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(20),
  blood_type VARCHAR(5),
  preferred_language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Profiles (Extended details)
CREATE TABLE user_profiles (
  profile_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  address TEXT,
  city VARCHAR(100),
  province VARCHAR(100),
  postal_code VARCHAR(20),
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  medical_aid_name VARCHAR(100),
  medical_aid_number VARCHAR(50),
  medical_aid_plan VARCHAR(100),
  allergies TEXT,
  chronic_conditions TEXT,
  current_medications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clinics Table
CREATE TABLE clinics (
  clinic_id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  province VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  services TEXT,
  operating_hours TEXT,
  is_24hrs BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE appointments (
  appointment_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  clinic_id UUID REFERENCES clinics(clinic_id) ON DELETE SET NULL,
  doctor_name VARCHAR(100),
  appointment_type VARCHAR(50) NOT NULL,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  reason TEXT,
  symptoms TEXT,
  is_telehealth BOOLEAN DEFAULT FALSE,
  telehealth_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Medications Table
CREATE TABLE medications (
  medication_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  dosage VARCHAR(50),
  frequency VARCHAR(100),
  purpose TEXT,
  prescribing_doctor VARCHAR(100),
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Medical History Table
CREATE TABLE medical_history (
  history_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  record_type VARCHAR(50) NOT NULL, -- 'condition', 'allergy', 'surgery', 'hospitalization'
  name VARCHAR(100) NOT NULL,
  description TEXT,
  date_diagnosed DATE,
  date_resolved DATE,
  is_chronic BOOLEAN DEFAULT FALSE,
  severity VARCHAR(20),
  treatment TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Symptoms Table
CREATE TABLE symptoms (
  symptom_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  onset_date TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  body_part VARCHAR(100),
  notes TEXT,
  appointment_id UUID REFERENCES appointments(appointment_id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Health Metrics Table
CREATE TABLE health_metrics (
  metric_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  metric_type VARCHAR(50) NOT NULL, -- 'heart_rate', 'blood_pressure', 'steps', 'sleep'
  value DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20),
  measured_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  source VARCHAR(50), -- 'manual', 'device', 'app'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Mental Health Table
CREATE TABLE mental_health (
  entry_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  mood_level INTEGER CHECK (mood_level BETWEEN 1 AND 5),
  notes TEXT,
  stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 10),
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 5),
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 5),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Chat Conversations Table
CREATE TABLE conversations (
  conversation_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP WITH TIME ZONE,
  language VARCHAR(10) DEFAULT 'en',
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Chat Messages Table
CREATE TABLE messages (
  message_id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(conversation_id) ON DELETE CASCADE,
  sender_type VARCHAR(10) NOT NULL, -- 'user' or 'bot'
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_medical_advice BOOLEAN DEFAULT FALSE,
  translation_content TEXT
);

-- Medical Images Table
CREATE TABLE medical_images (
  image_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_type VARCHAR(50), 
  analysis_result TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  analyzed_at TIMESTAMP WITH TIME ZONE,
  confidence_score DECIMAL(5, 2),
  notes TEXT
);

-- Prescriptions Table
CREATE TABLE prescriptions (
  prescription_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  image_id UUID REFERENCES medical_images(image_id) ON DELETE SET NULL,
  doctor_name VARCHAR(100),
  issue_date DATE,
  expiry_date DATE,
  ocr_text TEXT,
  verified BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Emergency Contacts Table
CREATE TABLE emergency_contacts (
  contact_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  relationship VARCHAR(50),
  phone_number VARCHAR(20) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  is_mental_health_contact BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Health Games Table
CREATE TABLE health_games (
  game_id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  difficulty VARCHAR(20),
  time_limit_seconds INTEGER,
  xp_reward INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Game Progress Table
CREATE TABLE user_games (
  user_game_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  game_id UUID REFERENCES health_games(game_id) ON DELETE CASCADE,
  times_played INTEGER DEFAULT 0,
  highest_score INTEGER DEFAULT 0,
  total_xp_earned INTEGER DEFAULT 0,
  last_played_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Badges Table
CREATE TABLE badges (
  badge_id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  xp_threshold INTEGER,
  is_secret BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Badges Table
CREATE TABLE user_badges (
  user_badge_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(badge_id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rewards System Table
CREATE TABLE rewards (
  reward_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  xp_earned INTEGER NOT NULL,
  source_type VARCHAR(50) NOT NULL,
  source_id UUID, -- reference to game, appointment, etc.
  description TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Health Content Table
CREATE TABLE health_content (
  content_id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content_type VARCHAR(50) NOT NULL, 
  content_text TEXT,
  content_url TEXT,
  language VARCHAR(10) DEFAULT 'en',
  is_featured BOOLEAN DEFAULT FALSE,
  categories TEXT, -- comma-separated
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Content Interactions Table
CREATE TABLE user_content (
  user_content_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  content_id UUID REFERENCES health_content(content_id) ON DELETE CASCADE,
  interaction_type VARCHAR(20), 
  interacted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

-- Community Posts Table
CREATE TABLE community_posts (
  post_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT NOT NULL,
  post_type VARCHAR(50),
  categories TEXT, -- comma-separated
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Community Comments Table
CREATE TABLE community_comments (
  comment_id UUID PRIMARY KEY,
  post_id UUID REFERENCES community_posts(post_id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_medical_advice BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Support Resources Table
CREATE TABLE support_resources (
  resource_id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  contact VARCHAR(100) NOT NULL,
  availability TEXT,
  resource_type VARCHAR(50),
  location TEXT,
  languages TEXT, -- comma-separated
  is_free BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System Settings Table
CREATE TABLE system_settings (
  setting_id UUID PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  setting_group VARCHAR(50),
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit Log Table
CREATE TABLE audit_log (
  log_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  old_values TEXT,
  new_values TEXT,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);