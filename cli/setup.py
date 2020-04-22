import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="pastify-hamza1311",  # Replace with your own username
    version="0.0.1",
    author="Hamza",
    author_email="author@example.com",
    description="Simple pastes",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/hamza1311/pastify",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
