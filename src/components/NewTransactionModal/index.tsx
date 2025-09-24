import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypebutton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

//O processo é Criar um objeto com o zod ditando como deve ser e quais informações deve ter. Depois criar um Type dessa variavel e depois trazer as propriedades do use form com zodResolver e criar uma função onde ele puxa todas as informacoes salvando elas com o register e podendo ser acessadas no return da função

export function NewTransactionModal() {
    const { createTransaction } = useContext(TransactionsContext)

    const {
        control, 
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,

     } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
         const { description, price, category, type } = data

        await createTransaction({
            description,
            price,
            category,
            type,
        })
        

        reset();
    }


    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type='text' 
                        placeholder='Descrição'
                        required
                        {...register('description')} 
                    />
                    <input 
                        type='number' 
                        placeholder='Preço' 
                        required 
                        {...register('price', {valueAsNumber: true})}
                    />
                    <input 
                        type='text' 
                        placeholder='Categoria' 
                        required
                        {...register('category')} 
                    />

                   <Controller 
                        control={control}
                        name='type'
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypebutton variant='income' value='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypebutton>

                                    <TransactionTypebutton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypebutton>
                                    
                                </TransactionType>
                            )
                        }}
                    />
                    

                    <button type='submit' disabled={isSubmitting}>Cadastrar</button>
                </form>

            </Content>
        </Dialog.Portal>
    )
}