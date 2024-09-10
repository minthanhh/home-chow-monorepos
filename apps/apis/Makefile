# Define the variable for the meal name, default to 'meals' if not provided
NAME ?= meals

# Define a target 'gmo' that depends on the dynamic file
gmo: $(NAME)

# Rule to create the target file from a recipe
$(NAME):
	@echo "Processing to create $(NAME)"
	nest g mo features/$(NAME)
	nest g s features/$(NAME)
	nest g co features/$(NAME)



RS_NAME ?= users

$(RS_NAME):
	nest g resource features/$(RS_NAME)


check:
	pnpm lint
	pnpm format
