-- fleetwise_schema.vehicle_trip_transaction definition

-- Drop table

-- DROP TABLE fleetwise_schema.vehicle_trip_transaction;

CREATE TABLE fleetwise_schema.vehicle_trip_transaction (
	trip_start_date timestamp NOT NULL,
	Vehicle_number varchar NOT NULL,
	driver_id varchar NOT NULL,
	rokar varchar NOT NULL,
	tripStartAmt float4 NOT NULL,
	tripid int4 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	create_at timestamp NOT NULL,
    updated_at timestamp NULL,
    created_by varchar NOT NULL,
    updated_by varchar NULL
);
COMMENT ON TABLE fleetwise_schema.vehicle_trip_transaction IS 'Store vehicle_trip_transaction Table Data';

-- Permissions

ALTER TABLE fleetwise_schema.vehicle_trip_transaction OWNER TO postgres;
GRANT ALL ON TABLE fleetwise_schema.vehicle_trip_transaction TO postgres;