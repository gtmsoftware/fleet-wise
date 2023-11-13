CREATE TABLE fleetwise_schema.rokar_counter (
	current_month varchar NOT NULL,
	counter_value int4 NOT NULL
);
COMMENT ON TABLE fleetwise_schema.rokar_counter IS 'Store Rokar Counmter Table Data';