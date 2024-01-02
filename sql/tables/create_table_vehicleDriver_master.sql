-- fleetwise_schema.vehicledriver_master definition

-- Drop table

-- DROP TABLE fleetwise_schema.vehicledriver_master;

CREATE TABLE fleetwise_schema.vehicledriver_master (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	driver_name varchar NOT NULL,
	address varchar NOT NULL,
	mobile varchar NULL,
	personal_bank_account varchar NULL
);

-- Permissions

ALTER TABLE fleetwise_schema.vehicledriver_master OWNER TO postgres;
GRANT ALL ON TABLE fleetwise_schema.vehicledriver_master TO postgres;