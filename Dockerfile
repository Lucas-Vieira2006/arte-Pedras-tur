# Estágio de Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia qualquer arquivo .csproj que existir na pasta
COPY *.csproj ./
RUN dotnet restore

# Copia o restante dos arquivos e compila
COPY . .
RUN dotnet publish *.csproj -c Release -o /app/publish

# Estágio de Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Porta padrão do Render
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# O PULO DO GATO: Esse comando descobre o nome da sua DLL sozinho e a executa
ENTRYPOINT ["sh", "-c", "dotnet $(ls *.dll | head -n 1)"]