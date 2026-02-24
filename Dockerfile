FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY artePedrasTur.api.csproj ./
RUN dotnet restore artePedrasTur.api.csproj

COPY . .
RUN dotnet publish artePedrasTur.api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "artePedrasTur.api.dll"]