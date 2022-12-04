# coding: utf-8

from typing import Dict, List  # noqa: F401

import json

from fastapi import (  # noqa: F401
    APIRouter,
    Body,
    Cookie,
    Depends,
    Form,
    Header,
    Path,
    Query,
    Response,
    Security,
    status,
    HTTPException,
)

from .con_settings import con_settings

from openapi_server.models.extra_models import TokenModel  # noqa: F401
from openapi_server.models.error import Error
from openapi_server.models.information import Information
from openapi_server.models.object import Object

setts = con_settings()

router = APIRouter()


@router.post(
    "/object",
    responses={
        201: {"model": Information, "description": "Created"},
        200: {"model": Error, "description": "unexpected error"},
    },
    tags=["Object"],
    summary="Create a object",
    response_model_by_alias=True,
)
async def create_object(
    object: Object = Body(None, description=""),
) -> Information:
    """Create a object"""
    with open(setts.config_path) as json_file:
        config = json.load(json_file)
        if object.id in config['objects']:
            return HTTPException(404, f'Object {object.id} is already exists')
        else:
            object_dict = {"id": object.id, "description": object.description,
                         "value": object.value}
            config['objects'][object_dict["id"]] = object_dict
            with open(setts.config_path, 'w') as outfile:
                json.dump(config, outfile)
            return HTTPException(201, 'OK')


@router.delete(
    "/object/{object_id}",
    responses={
        201: {"model": Information, "description": "Object deleted."},
        200: {"model": Error, "description": "unexpected error"}
    },
    tags=["Object"],
    summary="Delete Object",
    response_model_by_alias=True,
)
async def delete_object(
    object_id: str = Path(None, description="The id of the object to retrieve"),
) -> Information:
    """Delete Object object"""
    with open(setts.config_path) as json_file:
        config = json.load(json_file)
        if object_id in config['objects']:
            del config['objects'][object_id]
            with open(setts.config_path, 'w') as outfile:
                json.dump(config, outfile)
                return HTTPException(204, object)
        else:
            raise HTTPException(404, 'No resource')


@router.put(
    "/object/{object_id}",
    responses={
        201: {"model": Information, "description": "Created"},
        200: {"model": Error, "description": "unexpected error"},
    },
    tags=["Object"],
    summary="Edit object",
    response_model_by_alias=True,
)
async def edit_object(
    object_id: str = Path(None, description="The id of the object to retrieve"),
    object: Object = Body(None, description=""),
) -> Information:
    """Edit object"""
    with open(setts.config_path) as json_file:
        config = json.load(json_file)
        if object_id in config['objects']:
            object_dict = {"id": object.id, "description": object.description,
                         "value": object.value}
            config['objects'][object_id] = object_dict
            with open(setts.config_path, "w") as outfile:
                json.dump(config, outfile)
                return object
        else:
            raise HTTPException(404, 'Object is not exists')



@router.get(
    "/object/{object_id}",
    responses={
        200: {"model": Object, "description": "The Object"},
        200: {"model": Error, "description": "unexpected error"},
    },
    tags=["Object"],
    summary="Get Object",
    response_model_by_alias=True,
)
async def get_object(
    object_id: str = Path(None, description="The id of the object to retrieve"),
) -> Object:
    """Get the Object"""
    with open(setts.config_path) as json_file:
        config = json.load(json_file)
        table=[]
        if object_id in config['objects']:
            object= Object(id=object_id,
                        description=config['objects'][object_id]['description'],
                        value=config['objects'][object_id]['value'])
            return object
        else:
            raise HTTPException(404, 'Error')


@router.get(
    "/object",
    responses={
        200: {"model": List[Object], "description": "Expected response to a valid request"},
        200: {"model": Error, "description": "unexpected error"},
    },
    tags=["Object"],
    summary="Get objects",
    response_model_by_alias=True,
)
async def get_objects(
) -> List[Object]:
    """Get list of objects"""
    with open(setts.config_path) as json_file:
        config = json.load(json_file)
        result = []
        for object_id in config['objects']:
            object = Object(id=object_id,
                        description=config['objects'][object_id]['description'],
                        value=config['objects'][object_id]['value'])
            result.append(object)
        return result
