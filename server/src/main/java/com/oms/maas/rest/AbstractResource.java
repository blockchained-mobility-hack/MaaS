package com.oms.maas.rest;

import com.google.gson.Gson;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.core.Response;
import java.util.LinkedHashMap;

@RestController
public abstract class AbstractResource {

    public Response proceedRequest(LinkedHashMap map){
        Gson gson = new Gson();
        String json = gson.toJson(map);
/*
HashMap<String,Object> result =
        new ObjectMapper().readValue(JSON_SOURCE, HashMap.class);
 */
        return Response.ok().entity(json).build();
    }
}
