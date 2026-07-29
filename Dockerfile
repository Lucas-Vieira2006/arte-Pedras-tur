# Estágio 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore --no-cache
COPY . ./
RUN dotnet publish "artePedrasTur.api.csproj" -c Release -o /publish

# Estágio 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /publish .

EXPOSE 8080
ENTRYPOINT ["dotnet", "artePedrasTur.api.dll"]