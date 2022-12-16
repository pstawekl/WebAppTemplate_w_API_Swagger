# coding: utf-8

from fastapi.testclient import TestClient


from project_api.models.error import Error  # noqa: F401
from project_api.models.information import Information  # noqa: F401
from project_api.models.object import Object  # noqa: F401


def test_create_object(client: TestClient):
    """Test case for create_object

    Create a object
    """
    object = {"description":"description","id":"id","value":"value"}

    headers = {
    }
    response = client.request(
        "POST",
        "/object",
        headers=headers,
        json=object,
    )

    # uncomment below to assert the status code of the HTTP response
    #assert response.status_code == 200


def test_delete_object(client: TestClient):
    """Test case for delete_object

    Delete Object
    """

    headers = {
    }
    response = client.request(
        "DELETE",
        "/object/{object_id}".format(object_id='object_id_example'),
        headers=headers,
    )

    # uncomment below to assert the status code of the HTTP response
    #assert response.status_code == 200


def test_edit_object(client: TestClient):
    """Test case for edit_object

    Edit object
    """
    object = {"description":"description","id":"id","value":"value"}

    headers = {
    }
    response = client.request(
        "PUT",
        "/object/{object_id}".format(object_id='object_id_example'),
        headers=headers,
        json=object,
    )

    # uncomment below to assert the status code of the HTTP response
    #assert response.status_code == 200


def test_get_object(client: TestClient):
    """Test case for get_object

    Get Object
    """

    headers = {
    }
    response = client.request(
        "GET",
        "/object/{object_id}".format(object_id='object_id_example'),
        headers=headers,
    )

    # uncomment below to assert the status code of the HTTP response
    #assert response.status_code == 200


def test_get_objects(client: TestClient):
    """Test case for get_objects

    Get objects
    """

    headers = {
    }
    response = client.request(
        "GET",
        "/object",
        headers=headers,
    )

    # uncomment below to assert the status code of the HTTP response
    #assert response.status_code == 200

