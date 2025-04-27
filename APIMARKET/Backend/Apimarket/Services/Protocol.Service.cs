


using Apimarket.DTOs;
using Apimarket.Model;
using Apimarket.Models;
public class ProtocolService
{
    private readonly AppDbContext _context;

    public ProtocolService(AppDbContext context)
    {
        _context = context;
    }





    public async Task Add(protocolDTO model)
    {
        byte[] archivoBytes = null;

        if (model.Archivo_Protocol != null && model.Archivo_Protocol.Length > 0)
        {
            using (var memoryStream = new MemoryStream())
            {
                await model.Archivo_Protocol.CopyToAsync(memoryStream);
                archivoBytes = memoryStream.ToArray();
            }
        }


        var protocol = new Protocol
        {
            Nom_Protocol = model.Nom_Protocol,
            Tip_Protocol = model.Tip_Protocol,
            FecCre_Protocol = model.FecCre_Protocol,
            FecAct_Protocol = model.FecAct_Protocol,
            Archivo_Protocol = archivoBytes
        };

        _context.protocol.Add(protocol);
        await _context.SaveChangesAsync();
    }


    public Protocol GetProtocol(int id)
    {
        return _context.protocol.FirstOrDefault(p => p.Id_Protocol == id);
    }

    public void Update(Protocol protocol)
    {
        _context.protocol.Update(protocol);
        _context.SaveChanges();
    }
    public IEnumerable<Protocol> GetAll()
    {
        return _context.protocol.ToList();
    }

    public async Task<bool> DeleteProtocol(int id)
    {
        var protocol = await _context.protocol.FindAsync(id);
        if (protocol == null) return false;

        _context.protocol.Remove(protocol);
        await _context.SaveChangesAsync();
        return true;
    }
}