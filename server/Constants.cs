namespace server
{
    public static class Constants
    {

        public static readonly string DB_CONNECTION_STRING = Environment.GetEnvironmentVariable("RV_DB_CONNECTION_STRING", EnvironmentVariableTarget.Machine) ?? throw new Exception("RV_DB_CONNECTION_STRING environment variable not found.");
    }
}
