using DB_Libary;
using MIS_Backend.Dtos;
using MIS_Backend.Services;

namespace MIS_Backend.Maps;

public static class ProductApi
{
    public static IEndpointRouteBuilder MapProduct(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/products");

        //Paper
        var paperGroup = group.MapGroup("/papers");
        //GET
        paperGroup.MapGet("", (ProductService service) => service.GetAllPapers().Select(x => new PaperDto().CopyFrom(x)).ToList());
        paperGroup.MapGet("{id}", (ProductService service, int id) => new PaperDto().CopyFrom(service.GetPaperById(id)));
        //POST
        paperGroup.MapPost("", (ProductService service, PaperDto paperDto) => service.AddPaper(new Paper().CopyFrom(paperDto, ["Id"])));
        //PUT
        paperGroup.MapPut("{id}", (ProductService service, int id, PaperDto paperDto) => service.UpdatePaper(id, new Paper().CopyFrom(paperDto)));
        //DELETE
        paperGroup.MapDelete("{id}", (ProductService service, int id) => service.DeletePaper(id));

        //Printer
        var printerGroup = group.MapGroup("/printers");
        //GET
        printerGroup.MapGet("", (ProductService service) => service.GetAllPrinter());
        printerGroup.MapGet("{id}", (ProductService service, int id) => new PaperDto().CopyFrom(service.GetPrinterById(id)));
        //POST
        printerGroup.MapPost("", (ProductService service, PrinterDto printerDto) => service.AddPrinter(new Printer().CopyFrom(printerDto, ["Id"])));
        //PUT
        printerGroup.MapPut("{id}", (ProductService service, int id, PrinterDto printerDto) => service.UpdatePrinter(id, new Printer().CopyFrom(printerDto)));
        printerGroup.MapPut("/changeInactive/{id}", (ProductService service, int id) => service.ChangeInactiveValueForPrinter(id));
        //DELETE
        printerGroup.MapDelete("{id}", (ProductService service, int id) => service.DeletePrinter(id));

        //PostProcessing
        var postProcessGroup = group.MapGroup("/postprocessings");
        //GET
        postProcessGroup.MapGet("{id}", (ProductService service, int id) => service.GetPostProcessingById(id));
        //POST
        postProcessGroup.MapPost("", (ProductService service, PostProcessingDto postProcessingDto) => service.AddPostProcessing(new PostProcessing().CopyFrom(postProcessingDto, ["Id"])));
        //PUT
        postProcessGroup.MapPut("{id}", (ProductService service, int id, PostProcessingDto postProcessingDto) => service.UpdatePostProcessing(id, new PostProcessing().CopyFrom(postProcessingDto)));
        //DELETE
        postProcessGroup.MapDelete("{id}", (ProductService service, int id) => service.DeletePostProcessing(id));

        return routes;
    }
}
