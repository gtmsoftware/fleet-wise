-- fleetwise_schema.rokar_monthly_seq definition

-- DROP SEQUENCE fleetwise_schema.rokar_monthly_seq;

CREATE SEQUENCE fleetwise_schema.rokar_monthly_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE fleetwise_schema.rokar_monthly_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE fleetwise_schema.rokar_monthly_seq TO postgres;