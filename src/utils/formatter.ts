export const dateFormatter = new Intl.DateTimeFormat('pt-BR'); //Formatando a data. para que tenha um padrão dentro das normas

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
}); //Formatando o modo como o dinheiro irá aparecer