from typing import Any

__version__ = "0.0.1"
__all__ = ["sql"]

def get_provider_info() -> dict[str, Any]:
    return {
        "package-name": "my-sdk",
        "name": "My SDK",
        "description": "My SDK is a package that provides a set of tools for building Airflow DAGs.",
        "version": [__version__],
        "task-decorators": [
            {
                "name": "sql",
                "class-name": "my_sdk.decorators.sql.sql_task"
            }
        ]
    }