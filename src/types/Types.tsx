export type Ro = {
    _id?:string,
    numroOcorrencia?: number,
    tituloOcorrencia?: string,
    contrato:string,
    dataRegistro:Date,
    fase:string,
    orgao:string,
    classDefeito:string,
    versaoBaseDados: string,
    versaoSoftware: string,
    opcoesHardware:string,
    equipamento:string,
    equipPosicao:string,
    partNumber:string
    serialNumber:string,
    descricaoOcorrencia:string,
    relator:string
    responsavel:string
    suporte: roSuporteSchema
    defeito:string,
    pos_grad:string,
    base_dados:string,
    software:string,
    anexados:FileReader,
    descricao:string,
    nome:string
}




export type roSuporteSchema = {
    _id?:number,
    
}