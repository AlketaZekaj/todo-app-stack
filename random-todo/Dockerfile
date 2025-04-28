FROM python:3.9-slim
WORKDIR /app
COPY create-random-todo.py .
RUN pip install requests
CMD ["python", "create-random-todo.py"]
