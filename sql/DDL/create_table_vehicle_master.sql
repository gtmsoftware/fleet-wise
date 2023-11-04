-- fleetwise_schema.vehicle_master definition

-- Drop table

-- DROP TABLE fleetwise_schema.vehicle_master;

CREATE TABLE fleetwise_schema.vehicle_master (
	gadi_number varchar NOT NULL -- This Column Contain Vehicle Number
);
COMMENT ON TABLE fleetwise_schema.vehicle_master IS 'This Table Contain Vehicle Master Data';

-- Column comments

COMMENT ON COLUMN fleetwise_schema.vehicle_master.gadi_number IS 'This Column Contain Vehicle Number';

-- Permissions

ALTER TABLE fleetwise_schema.vehicle_master OWNER TO postgres;
GRANT ALL ON TABLE fleetwise_schema.vehicle_master TO postgres;