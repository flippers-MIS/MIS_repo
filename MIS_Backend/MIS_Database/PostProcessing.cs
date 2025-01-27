using System;
using System.Collections.Generic;

namespace MIS_Database;

public partial class PostProcessing
{
    public int Id { get; set; }

    public int PrinterId { get; set; }

    public string BindingType { get; set; } = null!;

    public string StandardPaperName { get; set; } = null!;

    public double CuttingTime { get; set; }

    public double CuttingCostEur { get; set; }

    public double CuttingStackHeight { get; set; }

    public double CuttingLarge { get; set; }

    public double CuttingSmall { get; set; }

    public double CuttingMaxSmallFormat { get; set; }

    public double CuttingCutContour { get; set; }

    public double NumberCircleOffer { get; set; }

    public double NumberCircleCalculation { get; set; }

    public double NumberCircleOrder { get; set; }

    public double NumberCircleService { get; set; }

    public string ActiveUser { get; set; } = null!;

    public string ActiveUserRole { get; set; } = null!;

    public string ActiveUserId { get; set; } = null!;

    public string ProgrammingNote { get; set; } = null!;

    public string CartonLabels { get; set; } = null!;

    public string LabelPrinterIpAddress { get; set; } = null!;

    public virtual Printer Printer { get; set; } = null!;
}
