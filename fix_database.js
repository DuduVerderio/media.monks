const fs = require('fs');

function corrigirBancoDeDados(dados, tipoBanco) {
  const dadosCorrigidos = dados.map(item => {
    if (item) {
      if (tipoBanco === 'banco_1' && 'nome' in item && 'vendas' in item) {
        const nomeCorrigido = item.nome.replace(/æ/g, 'a').replace(/ø/g, 'o');
        
        return { ...item, nome: nomeCorrigido, vendas: Number(item.vendas) };
      }

      else if (tipoBanco === 'banco_2' && 'id_marca' in item && 'marca' in item) {
        const marcaCorrigida = item.marca.replace(/æ/g, 'a').replace(/ø/g, 'o');

        return { id_marca: item.id_marca, marca: marcaCorrigida };
      } 

      else {
        console.error('Item inválido: ', item);

        return item;
      }

    } 
    else {
      console.error('Item inválido: ', item);

      return item;
    }
  });

  return dadosCorrigidos;
}

function corrigirEExportar(nomeArquivoEntrada, nomeArquivoSaida, tipoBanco) {
  fs.readFile(nomeArquivoEntrada, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo de entrada: ', err);

      return;
    }

    try {
      const dados = JSON.parse(data);
      const dadosCorrigidos = corrigirBancoDeDados(dados, tipoBanco);
      const dadosCorrigidosJSON = JSON.stringify(dadosCorrigidos, null, 2);

      fs.writeFile(nomeArquivoSaida, dadosCorrigidosJSON, 'utf8', (err) => {
        if (err) {
          console.error('Erro ao escrever o arquivo de saída: ', err);
        }

        else {
          console.log('Banco de dados corrigido e salvo em: ', nomeArquivoSaida);
        }
      });
    } 
    catch (e) {
      console.error('Erro ao analisar o arquivo: ', e);
    }
  });
}

corrigirEExportar('broken_database_1.json', 'fixed_database_1.json', 'banco_1');
corrigirEExportar('broken_database_2.json', 'fixed_database_2.json', 'banco_2');