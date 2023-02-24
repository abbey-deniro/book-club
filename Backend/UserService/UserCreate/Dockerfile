FROM public.ecr.aws/lambda/python:3.9
COPY createUser.py ${LAMBDA_TASK_ROOT}
COPY requirements.txt .
RUN pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"
CMD ["createUser.lambda_handler"]