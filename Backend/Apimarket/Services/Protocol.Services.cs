using Apimarket.Model;
using Apimarket.Models;

public class ProtocolServices
{
    private readonly AppDbContext _context;

    public ProtocolServices(AppDbContext context)
    {
        _context = context;
    }
    public IEnumerable<Protocol> GetAll()
    {
        return _context.protocol.ToList();
    }
    public void Add(Protocol protocol)
    {
        _context.protocol.Add(protocol);
        _context.SaveChanges();
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

    public async Task<bool> DeleteProtocol(int id) 
    {
        var protocol = await _context.protocol.FindAsync(id);
        if (protocol == null) return false;

        _context.protocol.Remove(protocol);
        await _context.SaveChangesAsync();
        return true;
    }
}
