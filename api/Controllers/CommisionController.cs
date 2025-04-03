using Microsoft.AspNetCore.Mvc;

namespace FCamara.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommisionController : ControllerBase
    {
        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        [HttpPost("Calculate")]
        public IActionResult Calculate(CommissionCalculationRequest calculationRequest)
        {
            try
            {
                if (calculationRequest is null)
                {
                    return BadRequest("Request cannot be null.");
                }

                if (calculationRequest.LocalSalesCount < 0 || calculationRequest.ForeignSalesCount < 0)
                {
                    return BadRequest("Sales counts cannot be negative.");
                }

                if (calculationRequest.AverageSaleAmount <= 0)
                {
                    return BadRequest("Average sale amount must be greater than zero.");
                }

                decimal fCamaraCommissionAmount = CalculateCommission(
                                                    calculationRequest.LocalSalesCount,
                                                    calculationRequest.ForeignSalesCount,
                                                    calculationRequest.AverageSaleAmount,
                                                    Constants.FCamaraCommissionPercentage.Local_Sales_Commission,
                                                    Constants.FCamaraCommissionPercentage.Foreign_Sales_Commission
                                                );

                decimal competitorCommissionAmount = CalculateCommission(
                                                    calculationRequest.LocalSalesCount,
                                                    calculationRequest.ForeignSalesCount,
                                                    calculationRequest.AverageSaleAmount,
                                                    Constants.CompetitorCommissionPercentage.Local_Sales_Commission,
                                                    Constants.CompetitorCommissionPercentage.Foreign_Sales_Commission
                                                );

                return Ok(new CommissionCalculationResponse()
                {
                    FCamaraCommissionAmount = fCamaraCommissionAmount,
                    CompetitorCommissionAmount = competitorCommissionAmount
                });

            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                throw;
            }

        }

        private decimal CalculateCommission(int localSales, int foreignSales, decimal averageSaleAmount,
                                    decimal localCommissionRate, decimal foreignCommissionRate)
        {
            decimal localCommission = localSales * averageSaleAmount * (localCommissionRate / 100);
            decimal foreignCommission = foreignSales * averageSaleAmount * (foreignCommissionRate / 100);
            return localCommission + foreignCommission;
        }
    }

    public class CommissionCalculationRequest
    {
        public int LocalSalesCount { get; set; }
        public int ForeignSalesCount { get; set; }
        public decimal AverageSaleAmount { get; set; }
    }

    public class CommissionCalculationResponse
    {
        public decimal FCamaraCommissionAmount { get; set; }

        public decimal CompetitorCommissionAmount { get; set; }
    }
}
