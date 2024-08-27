using wsample.api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace wsample.api.Utils
{
    public static class ResponseHelpers
    {
        public static IActionResult GetRestResponse(this BaseResponse baseResponse, ControllerBase instigator)
        {
            if (baseResponse == null)
            {
                return instigator.StatusCode((int)HttpStatusCode.InternalServerError);
            }

            switch (baseResponse.StatusCode)
            {
                case HttpStatusCode.OK:
                    {
                        var response = baseResponse.GetContents();
                        if (response == null)
                        {
                            return instigator.Ok();
                        }
                        return instigator.Ok(response);
                    }
                case HttpStatusCode.NoContent:
                    return instigator.NoContent();
                case HttpStatusCode.Created:
                    return instigator.Created();
                case HttpStatusCode.NotFound:
                    return instigator.NotFound();
                default:
                    return instigator.StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
    }
}
