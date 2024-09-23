-- Table: public.User

-- DROP TABLE IF EXISTS public."User";
CREATE TABLE IF NOT EXISTS public."User"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    "fullName" text COLLATE pg_catalog."default",
    username text COLLATE pg_catalog."default" NOT NULL,
    "birthDate" text COLLATE pg_catalog."default",
    work text COLLATE pg_catalog."default",
    address text COLLATE pg_catalog."default",
    avatar text COLLATE pg_catalog."default",
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "refreshToken" text COLLATE pg_catalog."default",
    phone integer,
    password text COLLATE pg_catalog."default" NOT NULL,
    "refreshTokenExpiration" timestamp(3) without time zone,
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
)

ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;
-- Index: User_email_key

-- DROP INDEX IF EXISTS public."User_email_key";

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key"
    ON public."User" USING btree
    (email COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: User_phone_key

-- DROP INDEX IF EXISTS public."User_phone_key";

CREATE UNIQUE INDEX IF NOT EXISTS "User_phone_key"
    ON public."User" USING btree
    (phone ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: User_username_key

-- DROP INDEX IF EXISTS public."User_username_key";

CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key"
    ON public."User" USING btree
    (username COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

----------------------------------------------------------------
-- Table: public.UserMeal

-- DROP TABLE IF EXISTS public."UserMeal";

CREATE TABLE IF NOT EXISTS public."UserMeal"
(
    "userId" text COLLATE pg_catalog."default" NOT NULL,
    "mealId" text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    CONSTRAINT "UserMeal_pkey" PRIMARY KEY ("userId", "mealId"),
    CONSTRAINT "UserMeal_mealId_fkey" FOREIGN KEY ("mealId")
        REFERENCES public."Meal" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT "UserMeal_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."User" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UserMeal"
    OWNER to postgres;


----------------------------------------------------------------

-- Table: public.Recipe

-- DROP TABLE IF EXISTS public."Recipe";

CREATE TABLE IF NOT EXISTS public."Recipe"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "nutritionalValueId" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Recipe_pkey" PRIMARY KEY (id),
    CONSTRAINT "Recipe_nutritionalValueId_fkey" FOREIGN KEY ("nutritionalValueId")
        REFERENCES public."NutritionalValue" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Recipe"
    OWNER to postgres;
-- Index: Recipe_nutritionalValueId_key

-- DROP INDEX IF EXISTS public."Recipe_nutritionalValueId_key";

CREATE UNIQUE INDEX IF NOT EXISTS "Recipe_nutritionalValueId_key"
    ON public."Recipe" USING btree
    ("nutritionalValueId" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;


----------------------------------------------------------------
-- Table: public.RecipeIngredient

-- DROP TABLE IF EXISTS public."RecipeIngredient";

CREATE TABLE IF NOT EXISTS public."RecipeIngredient"
(
    "recipeId" text COLLATE pg_catalog."default" NOT NULL,
    "ingredientId" text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("recipeId", "ingredientId"),
    CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId")
        REFERENCES public."Ingredient" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId")
        REFERENCES public."Recipe" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."RecipeIngredient"
    OWNER to postgres;


----------------------------------------------------------------
-- Table: public.NutritionalValue

-- DROP TABLE IF EXISTS public."NutritionalValue";

CREATE TABLE IF NOT EXISTS public."NutritionalValue"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    protein double precision NOT NULL,
    kcal integer NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    carbohydrates double precision NOT NULL,
    fat double precision NOT NULL,
    CONSTRAINT "NutritionalValue_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."NutritionalValue"
    OWNER to postgres;


----------------------------------------------------------------
-- Table: public.Meal

-- DROP TABLE IF EXISTS public."Meal";

CREATE TABLE IF NOT EXISTS public."Meal"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdById" text COLLATE pg_catalog."default" NOT NULL,
    "cuisineId" text COLLATE pg_catalog."default" NOT NULL,
    "recipeId" text COLLATE pg_catalog."default" NOT NULL,
    "imageId" text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Meal_pkey" PRIMARY KEY (id),
    CONSTRAINT "Meal_createdById_fkey" FOREIGN KEY ("createdById")
        REFERENCES public."User" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT "Meal_cuisineId_fkey" FOREIGN KEY ("cuisineId")
        REFERENCES public."Cuisine" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT "Meal_imageId_fkey" FOREIGN KEY ("imageId")
        REFERENCES public."Image" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT "Meal_recipeId_fkey" FOREIGN KEY ("recipeId")
        REFERENCES public."Recipe" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Meal"
    OWNER to postgres;


----------------------------------------------------------------
-- Table: public.Ingredient

-- DROP TABLE IF EXISTS public."Ingredient";

CREATE TABLE IF NOT EXISTS public."Ingredient"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    carbohydrates integer NOT NULL,
    fat integer NOT NULL,
    protein integer NOT NULL,
    "imageId" text COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT "Ingredient_pkey" PRIMARY KEY (id),
    CONSTRAINT "Ingredient_imageId_fkey" FOREIGN KEY ("imageId")
        REFERENCES public."Image" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Ingredient"
    OWNER to postgres;


----------------------------------------------------------------
-- Table: public.Image

-- DROP TABLE IF EXISTS public."Image";

CREATE TABLE IF NOT EXISTS public."Image"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    buffer bytea NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "mineType" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Image_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Image"
    OWNER to postgres;

----------------------------------------------------------------
-- Table: public.Cuisine

-- DROP TABLE IF EXISTS public."Cuisine";

CREATE TABLE IF NOT EXISTS public."Cuisine"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "iconId" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Cuisine_pkey" PRIMARY KEY (id),
    CONSTRAINT "Cuisine_iconId_fkey" FOREIGN KEY ("iconId")
        REFERENCES public."Image" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Cuisine"
    OWNER to postgres;
-- Index: Cuisine_name_key

-- DROP INDEX IF EXISTS public."Cuisine_name_key";

CREATE UNIQUE INDEX IF NOT EXISTS "Cuisine_name_key"
    ON public."Cuisine" USING btree
    (name COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
