package com.oms.maas.rest;

import com.google.gson.Gson;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.core.Response;
import java.util.LinkedHashMap;

@RestController
public abstract class AbstractResource {

    /**
     *
     * @param map map with endpoint parameters + values
     * @return just give it back as json
     */
    public Response proceedRequest(LinkedHashMap map){
        Gson gson = new Gson();
        String json = gson.toJson(map);

        return Response.ok().entity(json).build();
    }
}
