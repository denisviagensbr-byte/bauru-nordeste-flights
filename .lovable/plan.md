# Plano — Calendário mais simples e intuitivo

## Objetivo
Facilitar a cotação para qualquer pessoa entender imediatamente o próximo passo, selecionar ida e volta e corrigir uma escolha sem precisar recomeçar. A mesma experiência será aplicada aos calendários de Porto Seguro, Maceió, Porto de Galinhas e Recife.

## Fluxo proposto
1. **Mostrar o progresso em três passos**
   - `1 Destino` → `2 Ida e volta` → `3 Passageiros`.
   - Destacar visualmente o passo atual e marcar os concluídos.

2. **Orientar a pessoa dentro do calendário**
   - Antes da ida: mensagem destacada “Escolha a data de ida”.
   - Após a ida: confirmação da data escolhida e mensagem “Agora escolha a data de volta”.
   - Destacar somente as datas válidas para o próximo passo.
   - Depois da volta: mostrar o período completo e liberar os passageiros.

3. **Facilitar a troca de datas**
   - Exibir botões claros `Alterar ida` e `Alterar volta` ao lado do resumo.
   - `Alterar ida` limpa ida e volta e retorna ao primeiro passo do calendário.
   - `Alterar volta` mantém a ida e libera uma nova escolha de volta.
   - Clicar novamente na data de ida também entra no modo de alteração, com confirmação simples para evitar perda acidental da volta.

4. **Adicionar ajuda sem atrapalhar**
   - Incluir um botão `Como escolher as datas?` junto ao calendário.
   - Abrir uma explicação curta, em linguagem simples, com os passos para escolher e alterar datas.
   - Quando uma ação não for válida, mostrar uma mensagem específica explicando o que fazer, em vez de deixar a pessoa sem resposta.

5. **Melhorar leitura e acessibilidade**
   - Usar rótulos visíveis `IDA` e `VOLTA`, estados distintos para disponível, selecionado e indisponível.
   - Manter botões grandes no celular, foco de teclado e avisos anunciados para leitores de tela.
   - Preservar destinos, datas, passageiros e envio pelo WhatsApp já existentes.

6. **Padronizar todos os destinos**
   - Aplicar os mesmos passos, mensagens, ajuda e opções de alteração aos quatro destinos.
   - Respeitar as datas disponíveis e regras específicas de ida e volta de cada destino.

## Validação
- Testar o fluxo completo e a troca de ida/volta nos quatro destinos, em computador e celular.
- Conferir troca de mês, troca de destino, datas indisponíveis e mensagem final do WhatsApp.
- Confirmar ausência de sobreposição, rolagem lateral e erros na página.
