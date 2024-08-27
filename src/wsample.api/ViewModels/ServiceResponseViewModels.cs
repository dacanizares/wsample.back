using System.Net;

namespace wsample.api.ViewModels
{
    public class BaseResponse
    {
        public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK;

        public virtual object? GetContents() => null;
    }

    public class Response<T> : BaseResponse where T : class
    {
        public T? Content { get; set; }

        public override object? GetContents() => Content;
    }
}
