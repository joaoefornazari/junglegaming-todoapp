1. Estou usando Vite como builder do React por ser a ferramenta oficialmente recomendada pelo React na documentação
([link](https://react.dev/learn/creating-a-react-app#:~:text=If%20you%20want%20to%20build%20your%20own%20solutions%2C%20see%20our%20guide%20to%20build%20a%20React%20app%20from%20Scratch%20for%20instructions%20on%20how%20to%20set%20up%20a%20new%20React%20project%20starting%20with%20a%20build%20tool%20like%20Vite%2C%20Parcel%2C%20or%20RSbuild.)).

2. Senhas estão armazenadas no .env para não expô-las ao público e nem serem usadas por LLMs que forem treinados com o código do repositório. Enviarei o .env para vocês pelo email.

3. Comecei pelo `auth-service` como sugerido por vocês.

## AUTH SERVICE

1. Comecei pelas _migrations_ porque, para mim, o banco de dados é a fundação do web app como um todo. Um banco de dados bem projetado facilita a vida dos desenvolvedores.

2. O banco seguirá até a 3ª Forma Normal (FN). Referência: [link](https://www.datacamp.com/pt/tutorial/third-normal-form)

3. 
