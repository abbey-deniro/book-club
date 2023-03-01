FROM public.ecr.aws/lambda/python:3.9
COPY Auth.py ${LAMBDA_TASK_ROOT}
COPY requirements.txt .
RUN pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"
CMD ["Auth.lambda_handler"]