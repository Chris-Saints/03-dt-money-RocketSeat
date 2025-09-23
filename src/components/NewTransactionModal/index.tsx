import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypebutton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    // type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

//O processo é Criar um objeto com o zod ditando como deve ser e quais informações deve ter. Depois criar um Type dessa variavel e depois trazer as propriedades do use form com zodResolver e criar uma função onde ele puxa todas as informacoes salvando elas com o register e podendo ser acessadas no return da função

export function NewTransactionModal() {
    const { 
        register,
        handleSubmit,
        formState: { isSubmitting }

     } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    async function handleCreateNEwTransaction(data: NewTransactionFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(data);
    }


    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNEwTransaction)}>
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

                    <TransactionType>
                        <TransactionTypebutton variant='income' value='income'>
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypebutton>

                        <TransactionTypebutton variant='outcome' value='outcome'>
                            <ArrowCircleDown size={24} />
                            Saída
                        </TransactionTypebutton>
                        
                    </TransactionType>

                    <button type='submit' disabled={isSubmitting}>Cadastrar</button>
                </form>

            </Content>
        </Dialog.Portal>
    )
}