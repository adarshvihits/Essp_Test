using Hrms.Lite.Essp.Services.IServices;
using Hrms.Lite.Essp.Shared.General;
using Hrms.Lite.Essp.Shared.General;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;


public class ServiceBase : IServiceBase
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private ISession _session => _httpContextAccessor.HttpContext.Session;

    public ServiceBase(IOptions<AppSettings> settings, IHttpContextAccessor httpContextAccessor)
    {
        _baseUrl = settings.Value.ApiBaseUrl;
        _httpClient = new HttpClient();
        _httpContextAccessor = httpContextAccessor;


    }
    public async Task<T> GetAsync<T>(string url)
    {
        url = $"{_baseUrl}{url}";
        T result = default(T);

        var token = _session.GetString("JwtToken");
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token);

        var response = _httpClient.GetAsync(new Uri(url)).Result;
        if (response.ReasonPhrase == "Unauthorized")
        {
            return (T)Activator.CreateInstance(typeof(T), new object[] {});
        }
        response.EnsureSuccessStatusCode();
        await response.Content.ReadAsStringAsync().ContinueWith((Task<string> x) =>
        {
            if (x.IsFaulted)
                throw x.Exception;

            result = JsonConvert.DeserializeObject<T>(x.Result);
        });

        return result;
    }


    public async Task<T> DeleteAsync<T>(string url)
    {
        url = $"{_baseUrl}{url}";
        T result = default(T);

        var token = _session.GetString("JwtToken");
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token);

        //var response = _httpClient.GetAsync(new Uri(url)).Result;
        var response = _httpClient.DeleteAsync(new Uri(url)).Result;

        response.EnsureSuccessStatusCode();
        await response.Content.ReadAsStringAsync().ContinueWith((Task<string> x) =>
        {
            if (x.IsFaulted)
                throw x.Exception;

            result = JsonConvert.DeserializeObject<T>(x.Result);
        });

        return result;
    }

    public async Task<TResponse> PostAsync<TResponse, TData>(string apiUrl, TData postObject)
    {
        apiUrl = $"{_baseUrl}{apiUrl}";
        TResponse result = default(TResponse);
        var token = _session.GetString("JwtToken");
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token);

        var response = await _httpClient.PostAsync(apiUrl, postObject, new JsonMediaTypeFormatter()).ConfigureAwait(false);
       

        response.EnsureSuccessStatusCode();

        await response.Content.ReadAsStringAsync().ContinueWith((Task<string> x) =>
        {
            if (x.IsFaulted)
                throw x.Exception;

            result = JsonConvert.DeserializeObject<TResponse>(x.Result);

        });

        return result;
    }

    public async Task<TResponse> PostFormDataAsync<TResponse>(string url, MultipartFormDataContent data)
    {
        url = $"{_baseUrl}{url}";
        TResponse result = default(TResponse);
        var token = _session.GetString("JwtToken");
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token);
        var response = await _httpClient.PostAsync(url, data).ConfigureAwait(false);
        await response.Content.ReadAsStringAsync().ContinueWith((Task<string> x) =>
        {
            if (x.IsFaulted)
                throw x.Exception;

            result = JsonConvert.DeserializeObject<TResponse>(x.Result);

        });

        return result;
    }
}