-- fleetwise_schema.seller_master definition

-- Drop table

-- DROP TABLE fleetwise_schema.seller_master;

CREATE TABLE fleetwise_schema.seller_master (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	seller_name varchar NOT NULL,
	address varchar NOT NULL,
	gst_number varchar NULL,
	mobile1 varchar NULL,
	mobile2 varchar NULL,
	whatsapp varchar NULL,
	credit float4 NULL, -- nagad
	debit float4 NULL, -- Udhar
	bank_acount_no varchar NULL,
	upi_id varchar NULL
);

-- Column comments

COMMENT ON COLUMN fleetwise_schema.seller_master.credit IS 'nagad';
COMMENT ON COLUMN fleetwise_schema.seller_master.debit IS 'Udhar';

-- Permissions

ALTER TABLE fleetwise_schema.seller_master OWNER TO postgres;
GRANT ALL ON TABLE fleetwise_schema.seller_master TO postgres;