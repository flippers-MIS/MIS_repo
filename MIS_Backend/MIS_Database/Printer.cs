using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MIS_Database
{
    public class Printer
    {
        public required int Id { get; init; }
        public required string Name { get; set; }
        public required double FormatWidth { get; set; }
        public required double FormatLength { get; set; }
        public string FormatWidthXLength => $"{FormatWidth}x{FormatLength}";
        public required string FormatName { get; set; }

        private Printer() { }

        public static Printer Parse(string line)
        {
            ArgumentNullException.ThrowIfNull(line);

            string[] parts = line.Split(',');

            //id,name,format_width,format_length,format_name
            //1,Printer444,78x22,A2


            return new Printer
            {
                Id = int.Parse(parts[0]),
                Name = parts[1],
                FormatWidth = double.Parse(parts[2]),
                FormatLength = double.Parse(parts[3]),
                FormatName = parts[3],
            };
        }
    }
}
