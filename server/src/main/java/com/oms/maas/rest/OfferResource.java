package com.oms.maas.rest;

import com.oms.maas.api.OfferApi;
import org.apache.commons.io.IOUtils;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.core.Response;

@RestController
public class OfferResource extends OfferApi {

    @Override
    public Response offerCheapGet() {
        String iotaStuff = getInformationFromBeyond("js stuff"); //TODO ad js command

        Response response = Response.ok().entity("{\n" +
                "  \"id\":\"1234\",\n" +
                "  \"productName\":\"DriveNow\",\n" +
                "  \"description\":\"Meet at the mainstation\",\n" +
                "  \"validFrom\": \"20180720\",\n" +
                "  \"validFrom\": \"20180729\",\n" +
                "  \"locationStart\":\"Munich\",\n" +
                "  \"locationEnd\":\"Berlin\",\n" +
                "  \"price\": \"100\",\n" +
                "  \"currency\":\"eur\",\n" +
                "  \"co2-emission\":\"5/10\",\n" +
                "  \"options\":\"...\"\n" +
                "}").build();
        return response;
    }

    @Override
    public Response offerFastGet() {
        String iotaStuff = getInformationFromBeyond("js stuff"); //TODO ad js command

        Response response = Response.ok().entity("{\n" +
                "  \"id\":\"1234\",\n" +
                "  \"productName\":\"DriveNow\",\n" +
                "  \"description\":\"Meet at the mainstation\",\n" +
                "  \"validFrom\": \"20180720\",\n" +
                "  \"validFrom\": \"20180729\",\n" +
                "  \"locationStart\":\"Munich\",\n" +
                "  \"locationEnd\":\"Berlin\",\n" +
                "  \"price\": \"100\",\n" +
                "  \"currency\":\"eur\",\n" +
                "  \"co2-emission\":\"5/10\",\n" +
                "  \"options\":\"...\"\n" +
                "}").build();
        return response;
    }

    @Override
    public Response offerIdGet(String id) {
        String iotaStuff = getInformationFromBeyond("js stuff"); //TODO ad js command

        Response response = Response.ok().entity("{\n" +
                "  \"id\":\"1234\",\n" +
                "  \"productName\":\"DriveNow\",\n" +
                "  \"description\":\"Meet at the mainstation\",\n" +
                "  \"validFrom\": \"20180720\",\n" +
                "  \"validFrom\": \"20180729\",\n" +
                "  \"locationStart\":\"Munich\",\n" +
                "  \"locationEnd\":\"Berlin\",\n" +
                "  \"price\": \"100\",\n" +
                "  \"currency\":\"eur\",\n" +
                "  \"co2-emission\":\"5/10\",\n" +
                "  \"options\":\"...\",\n" +
                "  \"address\":\"" + iotaStuff + "\"\n" +
                "}").build();
        return response;
    }


    private String getInformationFromBeyond(String function){
        Runtime runtime = Runtime.getRuntime();

        String s = "";
        try {
            Process process = runtime.exec(function);
            int resultCode = process.waitFor();

            if (resultCode == 0) {
                // all is good
            }

            s = IOUtils.toString(process.getInputStream());
            String error = IOUtils.toString(process.getErrorStream());
        } catch (Throwable cause) {
            // process cause
        }

        return s;
    }
}
