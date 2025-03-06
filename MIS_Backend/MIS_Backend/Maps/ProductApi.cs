using CustomersDb;
using MIS_Backend.Dtos;
using MIS_Backend.Services;

namespace MIS_Backend.Maps
{
    public static class ProductApi
    {
        public static IEndpointRouteBuilder MapProduct(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/products");
            var printerGroup = group.MapGroup("/printers");
            var paperGroup = group.MapGroup("/papers");
            paperGroup.MapGet("", (ProductService service) => service.GetAllPapers().Select(x => new PaperDto().CopyFrom(x)).ToList());
            paperGroup.MapGet("{id}", (ProductService service, int id) => new PaperDto().CopyFrom(service.GetPaperById(id)));
            paperGroup.MapPost("", (ProductService service, PaperDto paper) =>
            {
            var newPaper = new Paper();
            newPaper.CopyFrom(paper);
            return service.AddPaper(newPaper);
        });

            paperGroup.MapPut("{id}", (ProductService service, int id, PaperDto paper) => service.UpdatePaper(id, new Paper().CopyFrom(paper)));
            paperGroup.MapDelete("{id}", (ProductService service, int id) => service.DeletePaper(id));



            printerGroup.MapGet("", (ProductService service) => service.GetAllPrinter());

            return routes;
        }
}
}
