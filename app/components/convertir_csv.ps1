$in  = "C:\Users\anton\OneDrive\Escritorio\Certificados_Profesionales_TodoFP.csv"
$out = "C:\Users\anton\OneDrive\Escritorio\Certificados_Profesionales_TodoFP_sc.csv"

# Lee el CSV con comas y vuelve a escribirlo con punto y coma, preservando comillas y acentos
Import-Csv -Path $in -Delimiter ',' |
    Export-Csv -Path $out -Delimiter ';' -NoTypeInformation -Encoding UTF8

Write-Host "OK -> $out"