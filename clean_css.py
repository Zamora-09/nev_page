#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para limpiar duplicados en archivo CSS
"""

import re
import os
from collections import OrderedDict

def clean_css_file(input_file, output_file):
    """
    Limpia duplicados del archivo CSS
    """
    print(f"Leyendo archivo: {input_file}")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"Tamaño original: {len(content)} caracteres")
    
    # Dividir el contenido en bloques CSS
    # Buscar patrones de reglas CSS completas
    css_blocks = []
    
    # Patrón para encontrar reglas CSS completas
    # Incluye selectores, propiedades y valores
    pattern = r'([^{}]*(?:\{[^{}]*\}[^{}]*)*)'
    
    # Dividir por líneas y procesar
    lines = content.split('\n')
    current_block = []
    in_rule = False
    brace_count = 0
    
    for line in lines:
        current_block.append(line)
        
        # Contar llaves para detectar el final de una regla
        brace_count += line.count('{') - line.count('}')
        
        if brace_count == 0 and current_block:
            # Fin de una regla CSS
            block_text = '\n'.join(current_block).strip()
            if block_text and not block_text.startswith('/*'):
                css_blocks.append(block_text)
            current_block = []
    
    # Agregar el último bloque si existe
    if current_block:
        block_text = '\n'.join(current_block).strip()
        if block_text:
            css_blocks.append(block_text)
    
    print(f"Encontrados {len(css_blocks)} bloques CSS")
    
    # Eliminar duplicados manteniendo el orden
    unique_blocks = list(OrderedDict.fromkeys(css_blocks))
    
    print(f"Después de eliminar duplicados: {len(unique_blocks)} bloques")
    
    # Reconstruir el archivo
    cleaned_content = '\n\n'.join(unique_blocks)
    
    # Escribir archivo limpio
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print(f"Archivo limpio guardado como: {output_file}")
    print(f"Tamaño final: {len(cleaned_content)} caracteres")
    print(f"Reducción: {((len(content) - len(cleaned_content)) / len(content) * 100):.1f}%")

def clean_css_simple(input_file, output_file):
    """
    Método simple: eliminar líneas duplicadas consecutivas
    """
    print(f"Limpiando archivo: {input_file}")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print(f"Líneas originales: {len(lines)}")
    
    # Eliminar líneas duplicadas consecutivas
    cleaned_lines = []
    prev_line = None
    
    for line in lines:
        if line.strip() != prev_line:
            cleaned_lines.append(line)
            prev_line = line.strip()
    
    print(f"Líneas después de limpieza: {len(cleaned_lines)}")
    
    # Escribir archivo limpio
    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(cleaned_lines)
    
    print(f"Archivo limpio guardado como: {output_file}")

if __name__ == "__main__":
    input_file = "styles.css"
    output_file = "styles_clean.css"
    
    if os.path.exists(input_file):
        clean_css_simple(input_file, output_file)
        
        # Verificar el resultado
        print(f"\nResumen:")
        print(f"Archivo original: {os.path.getsize(input_file)} bytes")
        print(f"Archivo limpio: {os.path.getsize(output_file)} bytes")
        print(f"Espacio ahorrado: {os.path.getsize(input_file) - os.path.getsize(output_file)} bytes")
    else:
        print(f"Error: No se encontró el archivo {input_file}") 