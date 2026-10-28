import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { RegistrationService } from '../services/registrationService';

export async function registrationRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions) {
  // 1. Create Inscription
  fastify.post('/registrations', async (request, reply) => {
    try {
      const body = request.body as any;

      if (!body.maridoNome || !body.esposaNome) {
        return reply.status(400).send({
          success: false,
          error: 'Nomes do marido e da esposa são obrigatórios.',
        });
      }

      if (!body.maridoCelular || !body.esposaCelular) {
        return reply.status(400).send({
          success: false,
          error: 'Telefones celulares são obrigatórios.',
        });
      }

      const result = await RegistrationService.createInscription(body);

      return reply.status(201).send({
        success: true,
        message: 'Inscrição registrada com sucesso!',
        voucherCode: result.data.voucherCode,
        paymentUrl: 'https://sacola.pagbank.com.br/7f90fb8d-0ea8-44f9-b11f-b73ca1e192c6',
        data: result.data,
        source: result.source,
      });
    } catch (err: any) {
      request.log.error(err);
      return reply.status(500).send({
        success: false,
        error: 'Erro ao processar a inscrição.',
        details: err?.message,
      });
    }
  });

  // 2. List Inscriptions
  fastify.get('/registrations', async (request, reply) => {
    try {
      const { search } = request.query as { search?: string };
      const records = await RegistrationService.listInscriptions(search);
      return reply.send({
        success: true,
        count: records.length,
        data: records,
      });
    } catch (err: any) {
      request.log.error(err);
      return reply.status(500).send({
        success: false,
        error: 'Erro ao listar inscrições.',
      });
    }
  });

  // 3. Find by Voucher Code
  fastify.get('/registrations/:voucher', async (request, reply) => {
    try {
      const { voucher } = request.params as { voucher: string };
      const record = await RegistrationService.getByVoucher(voucher);

      if (!record) {
        return reply.status(404).send({
          success: false,
          error: 'Inscrição não encontrada para o código informado.',
        });
      }

      return reply.send({
        success: true,
        data: record,
      });
    } catch (err: any) {
      request.log.error(err);
      return reply.status(500).send({
        success: false,
        error: 'Erro ao buscar inscrição.',
      });
    }
  });

  // 4. Statistics
  fastify.get('/stats', async (_request, reply) => {
    try {
      const stats = await RegistrationService.getStats();
      return reply.send({
        success: true,
        data: stats,
      });
    } catch (err: any) {
      return reply.status(500).send({
        success: false,
        error: 'Erro ao obter estatísticas.',
      });
    }
  });
}
