import setuptools
import setuptools.command.install

setuptools.setup(
    name='Demo Seed API',
    version='1',
    author='Evap',
    entry_points={
        'console_scripts': [
            'api = products.server:main',
        ]
    },
    packages=setuptools.find_packages()
)
