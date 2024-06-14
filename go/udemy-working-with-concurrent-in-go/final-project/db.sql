--
-- Name: plans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plans (
                              id integer NOT NULL,
                              plan_name character varying(255),
                              plan_amount integer,
                              created_at timestamp without time zone,
                              updated_at timestamp without time zone
);


--
-- Name: plans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.plans ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.plans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_plans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_plans (
                                   id integer NOT NULL,
                                   user_id integer,
                                   plan_id integer,
                                   created_at timestamp without time zone,
                                   updated_at timestamp without time zone
);


--
-- Name: user_plans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.user_plans ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_plans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


CREATE TABLE public.users (
                              id integer DEFAULT nextval('public.user_id_seq'::regclass) NOT NULL,
                              email character varying(255),
                              first_name character varying(255),
                              last_name character varying(255),
                              password character varying(60),
                              user_active integer DEFAULT 0,
                              is_admin integer default 0,
                              created_at timestamp without time zone,
                              updated_at timestamp without time zone
);


INSERT INTO "public"."users"("email","first_name","last_name","password","user_active", "is_admin", "created_at","updated_at")
VALUES
    (E'admin@example.com',E'Admin',E'User',E'$2a$12$1zGLuYDDNvATh4RA4avbKuheAMpb1svexSzrQm7up.bnpwQHs0jNe',1,1,E'2022-03-14 00:00:00',E'2022-03-14 00:00:00');

SELECT pg_catalog.setval('public.plans_id_seq', 1, false);


SELECT pg_catalog.setval('public.user_id_seq', 2, true);


SELECT pg_catalog.setval('public.user_plans_id_seq', 1, false);

INSERT INTO "public"."plans"("plan_name","plan_amount","created_at","updated_at")
VALUES
    (E'Bronze Plan',1000,E'2022-05-12 00:00:00',E'2022-05-12 00:00:00'),
    (E'Silver Plan',2000,E'2022-05-12 00:00:00',E'2022-05-12 00:00:00'),
    (E'Gold Plan',3000,E'2022-05-12 00:00:00',E'2022-05-12 00:00:00');


ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.user_plans
    ADD CONSTRAINT user_plans_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.user_plans
    ADD CONSTRAINT user_plans_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(id) ON UPDATE RESTRICT ON DELETE CASCADE;


ALTER TABLE ONLY public.user_plans
    ADD CONSTRAINT user_plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;



