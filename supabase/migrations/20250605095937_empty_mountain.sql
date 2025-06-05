-- Create enums
CREATE TYPE gender_enum AS ENUM ('MASCULINO', 'FEMENINO', 'OTRO');
CREATE TYPE reservation_status_enum AS ENUM ('ACEPTADA', 'CANCELADA');
CREATE TYPE payment_type_enum AS ENUM ('TARJETA', 'BIZUM', 'TRANSFERENCIA');
CREATE TYPE transaction_type_enum AS ENUM ('RESERVA', 'VISIBILIDAD');

-- Create administrator table
CREATE TABLE IF NOT EXISTS administrator (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  surname text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  type_user text DEFAULT 'admin'
);

-- Create guide table
CREATE TABLE IF NOT EXISTS guide (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  surname text NOT NULL,
  country text NOT NULL,
  city text NOT NULL,
  gender gender_enum NOT NULL,
  phone text NOT NULL,
  profile_img text,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  background_check_certificate boolean DEFAULT false,
  identity_document boolean DEFAULT false,
  hourly_price integer DEFAULT 0,
  additional_info text,
  phrase text,
  type_user text DEFAULT 'guide',
  created_at timestamptz DEFAULT now()
);

-- Create tourist table
CREATE TABLE IF NOT EXISTS tourist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  surname text NOT NULL,
  country text NOT NULL,
  city text NOT NULL,
  gender gender_enum NOT NULL,
  phone text NOT NULL,
  profile_img text,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  type_user text DEFAULT 'tourist',
  created_at timestamptz DEFAULT now()
);

-- Create language table
CREATE TABLE IF NOT EXISTS language (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL UNIQUE
);

-- Create hobbies table
CREATE TABLE IF NOT EXISTS hobbies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE
);

-- Create guide_language junction table
CREATE TABLE IF NOT EXISTS guide_language (
  guide_id uuid REFERENCES guide(id),
  language_id uuid REFERENCES language(id),
  PRIMARY KEY (guide_id, language_id)
);

-- Create guide_hobbies junction table
CREATE TABLE IF NOT EXISTS guide_hobbies (
  guide_id uuid REFERENCES guide(id),
  hobbies_id uuid REFERENCES hobbies(id),
  PRIMARY KEY (guide_id, hobbies_id)
);

-- Create reservation table
CREATE TABLE IF NOT EXISTS reservation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tourist_id uuid REFERENCES tourist(id),
  guide_id uuid REFERENCES guide(id),
  reservation_date timestamptz DEFAULT now(),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status reservation_status_enum DEFAULT 'ACEPTADA',
  review text,
  review_score integer CHECK (review_score >= 0 AND review_score <= 5),
  reserved_hours integer NOT NULL,
  price decimal NOT NULL,
  deleted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create transaction table
CREATE TABLE IF NOT EXISTS transaction (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount decimal NOT NULL,
  type transaction_type_enum NOT NULL,
  payment_type payment_type_enum NOT NULL,
  transaction_date timestamptz DEFAULT now(),
  reservation_id uuid REFERENCES reservation(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE administrator ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide ENABLE ROW LEVEL SECURITY;
ALTER TABLE tourist ENABLE ROW LEVEL SECURITY;
ALTER TABLE language ENABLE ROW LEVEL SECURITY;
ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_language ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_hobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Administrators can read own data" ON administrator
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Guides can read own data" ON guide
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Tourists can read own data" ON tourist
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Public can read languages" ON language
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Public can read hobbies" ON hobbies
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Guides can manage their languages" ON guide_language
  FOR ALL TO authenticated
  USING (guide_id = auth.uid());

CREATE POLICY "Guides can manage their hobbies" ON guide_hobbies
  FOR ALL TO authenticated
  USING (guide_id = auth.uid());

CREATE POLICY "Users can read their reservations" ON reservation
  FOR SELECT TO authenticated
  USING (tourist_id = auth.uid() OR guide_id = auth.uid());

CREATE POLICY "Tourists can create reservations" ON reservation
  FOR INSERT TO authenticated
  WITH CHECK (tourist_id = auth.uid());

CREATE POLICY "Users can update their reservations" ON reservation
  FOR UPDATE TO authenticated
  USING ((tourist_id = auth.uid() OR guide_id = auth.uid()));

CREATE POLICY "Users can read their transactions" ON transaction
  FOR SELECT TO authenticated
  USING (reservation_id IN (
    SELECT id FROM reservation WHERE tourist_id = auth.uid() OR guide_id = auth.uid()
  ));

-- Insert initial languages
INSERT INTO language (language) VALUES
  ('Inglés'),
  ('Español'),
  ('Mandarín'),
  ('Hindi'),
  ('Árabe'),
  ('Bengalí'),
  ('Portugués'),
  ('Ruso'),
  ('Japonés'),
  ('Alemán'),
  ('Francés'),
  ('Punjabi'),
  ('Javanés'),
  ('Wu'),
  ('Telugu'),
  ('Marathi'),
  ('Turco'),
  ('Tamil'),
  ('Urdu'),
  ('Vietnamita');

-- Insert initial hobbies
INSERT INTO hobbies (name) VALUES
  ('Deportes'),
  ('Cultura'),
  ('Gastronomía'),
  ('Naturaleza'),
  ('Fiesta'),
  ('Compras'),
  ('Religión'),
  ('Historia'),
  ('Arte'),
  ('Música'),
  ('Tecnología'),
  ('Cine'),
  ('Literatura'),
  ('Moda'),
  ('Viajes'),
  ('Animales'),
  ('Ciencia'),
  ('Política'),
  ('Economía'),
  ('Salud'),
  ('Educación'),
  ('Ecología'),
  ('Otros');

-- Insert admin user
INSERT INTO administrator (name, surname, email, password)
VALUES ('Admin', 'System', 'admin@localguide.com', 'Admin123');