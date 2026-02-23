# Estágio de Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia o arquivo de projeto e restaura as dependências
COPY ["artePedrasTur.csproj", "./"]
RUN dotnet restore "artePedrasTur.csproj"

# Copia o restante do código e compila
COPY . .
RUN dotnet publish "artePedrasTur.csproj" -c Release -o /app/publish

# Estágio de Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Porta que o Render exige para o plano gratuito
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "artePedrasTur.dll"]