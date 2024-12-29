'use client'

import React, { useState, useEffect } from 'react'
import {
    Container,
    Box,
    Card,
    CardContent,
    Typography,
    Pagination,
    CircularProgress,
    Button,
    Modal,
    Alert
} from '@mui/material'
import axios from '@/utils/axios'
import Grid from '@mui/material/Grid2'
import { useModal } from '@/hooks/useModal'
import { SureDeleteModal } from '@/components/modalGlobalComponents/SureDeleteModal'
import EditProjectIdeaModal from './EditProjectIdeaModal'

export interface DataItem {
    id: number
    nome: string
    descricao: string
    proponente: string
    dataCriacao: string
}

export const ProjectIdeasMain: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage] = useState<number>(2) // Quantos itens por página
    const { ...modal } = useModal()
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [actualEditText, setActualEditText] = useState<string>('')

    // Fetch data from the API
    const fetchProjectIdeas = async () => {
        try {
            const response = await axios.get('/api/Ideias')
            const fetchIdeas: DataItem[] = response.data
            console.log('Ideias:', fetchIdeas)
            setData(fetchIdeas)
            setIsLoading(false)
        } catch (error) {
            console.error('Erro ao buscar projetos:', error)
        }
    }

    useEffect(() => {
        fetchProjectIdeas()
    }, [])

    // Função para calcular os itens a serem exibidos na página atual
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    }

    // Função para deletar um item
    const handleDelete = async (id: number) => {
        try {
            modal.open({
                title: 'Deletar Ideia',
                size: 'md',
                customRender: () => (
                    <SureDeleteModal
                        setShowAlert={setShowAlert}
                        setData={setData}
                        itemId={id}
                        isOpen={true}
                        onClose={modal.close}
                        onConfirm={modal.close}
                    />
                )
            })

            // Ativar o Alert do MUI
        } catch (error) {
            console.error(`Erro ao deletar o item ${id}:`, error)
        }
    }

    // Função para editar um item
    const handleEdit = async (id: number) => {
        const itemToEdit = data.find(item => item.id === id)
        if (!itemToEdit) {
            console.error(`Item com id ${id} não encontrado`)
            return
        }
        try {
            modal.open({
                title: 'Editar Descrição da ideia',
                size: 'md',
                customRender: () => (
                    <EditProjectIdeaModal
                        item={itemToEdit}
                        handleClose={modal.close}
                        setData={setData}
                        setActualEditText={setActualEditText}
                    />
                )
            })

            console.log(`Item ${id} atualizado com sucesso`)
        } catch (error) {
            console.error(`Erro ao atualizar o item ${id}:`, error)
        }
    }

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" gutterBottom align="center">
                    Tabela de Cards
                </Typography>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {paginatedData.map(item => (
                                <Grid size={{ xs: 12 }} key={item.id}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {item.nome}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Proponente: {item.proponente}
                                            </Typography>
                                            <Typography variant="body2" sx={{ my: 1 }}>
                                                {item.descricao}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Criado em: {new Date(item.dataCriacao).toLocaleString()}
                                            </Typography>
                                            <Box display="flex" justifyContent="space-between" mt={2}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleEdit(item.id)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Deletar
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Pagination
                                count={Math.ceil(data.length / itemsPerPage)} // Número total de páginas
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Box>
            {showAlert && (
                <Alert
                    onClose={() => setShowAlert(false)}
                    severity="success"
                    sx={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}
                >
                    Item deletado com sucesso!
                </Alert>
            )}
        </Container>
    )
}
