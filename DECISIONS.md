1. Estou usando Vite como builder do React por ser a ferramenta oficialmente recomendada pelo React na documentação
([link](https://react.dev/learn/creating-a-react-app#:~:text=If%20you%20want%20to%20build%20your%20own%20solutions%2C%20see%20our%20guide%20to%20build%20a%20React%20app%20from%20Scratch%20for%20instructions%20on%20how%20to%20set%20up%20a%20new%20React%20project%20starting%20with%20a%20build%20tool%20like%20Vite%2C%20Parcel%2C%20or%20RSbuild.)).

2. Senhas estão armazenadas no .env para não expô-las ao público e nem serem usadas por LLMs que forem treinados com o código do repositório. Enviarei o .env para vocês pelo email.

3. Comecei pelo `auth-service` como sugerido por vocês.

## AUTH SERVICE

1. Comecei pelas _migrations_ porque, para mim, o banco de dados é a fundação do web app como um todo. Um banco de dados bem projetado facilita a vida dos desenvolvedores.

2. O banco seguirá até a 3ª Forma Normal (FN) com exceção da tabela `logs`. Referência: [link](https://www.datacamp.com/pt/tutorial/third-normal-form)

3. Criei uma tabela `user_tasks` que é uma entidade associativa que vai armazenar apenas o ID do usuário e o ID da tarefa que foi atribuída a ele. Desta forma, tarefas podem ser atribuídas a vários usuários sem usar uma única coluna na tabela `tasks` ou `users`, não tendo "desvio de função" e seguindo a 3ª FN.

4. A tabela `comments` será vinculada a um único `user` e a uma única `task`, e caso a `task` ou o `user` deixem de existir, o `comment` também deixa de existir, pela praticidade de se implementar este comportamento em vez de preservar os comentários mesmo que o usuário tenha sido removido.

5. A tabela de `logs` tem o atributo `object_id`, que pode ser o ID de um usuário, de uma tarefa ou de um comentário. Para permitir essa referência a mais de uma tabela e não criar um atributo para cada tarefa, `object_id` não é uma chave estrangeira.

6. A tabela `logs` não segue a 3ª FN porque os atributos `object_type` e `object_action` dependem tanto do atributo `id` quanto do atributo `user_id`, caracterizando dependência transitiva.

