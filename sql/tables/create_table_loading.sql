-- fleetwise_schema.loading definition

-- Drop table

-- DROP TABLE fleetwise_schema.loading;

CREATE TABLE fleetwise_schema.loading (
	sale_point varchar NOT NULL,
	buyer varchar NOT NULL,
	cr_dr varchar NOT NULL,
	vehiclenumber varchar NOT NULL,
	rokar varchar NOT NULL,
	loadingid int4 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	"timestamp" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	loaddt timestamp NOT NULL,
	weight float4 NOT NULL,
	rate float4 NOT NULL,
	total float4 NOT NULL,
	CONSTRAINT loading_un UNIQUE (rokar)
);
COMMENT ON TABLE fleetwise_schema.loading IS 'Store Loading Table Data';

-- Permissions

ALTER TABLE fleetwise_schema.loading OWNER TO postgres;
GRANT ALL ON TABLE fleetwise_schema.loading TO postgres;